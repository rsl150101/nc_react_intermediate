import styled from "styled-components";
import {
  motion,
  stagger,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "motion/react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useLayoutReady } from "../hooks/useLayoutReady";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${(props) => props.theme.black.darker};
  font-size: 14px;
  padding: 20px 60px;
  color: ${(props) => props.theme.white.lighter};
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke: ${(props) => props.theme.red};
    stroke-width: 3px;
    stroke-miterlimit: 10;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  min-height: 40px;
`;

const Item = styled.li`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const ItemBottomBar = styled(motion.div)`
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.red};
  position: absolute;
  bottom: -5px;
`;

const SearchForm = styled.form`
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchSVG = styled(motion.svg)`
  height: 25px;
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const SearchInput = styled(motion.input)`
  position: absolute;
  right: 0px;
  z-index: -1;
  height: 40px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  outline: none;
  border-radius: 5px;
  transform-origin: right center;
  min-width: 230px;
  padding: 5 10px;
  padding-left: 40px;
  font-size: 16;
  color: ${(props) => props.theme.white.lighter};
  background-color: transparent;
`;

const logoPaths = [
  "M10,100 L10,0 L35,0 L75,65 L75,0 L100,0 L100,96 L75,96 L35,30 L35,98 Z", // N
  "M115,50 C115,20 130,0 155,0 C180,0 195,20 195,50 C195,85 180,94 155,94 C130,94 115,85 115,50 Z M135,50 C135,70 140,78 155,78 C170,78 175,70 175,50 C175,30 170,16 155,16 C140,16 135,30 135,50 Z", // O
  "M210,92 L210,0 L235,0 L260,60 L285,0 L310,0 L310,92 L285,92 L285,35 L260,92 L235,35 L235,92 Z", // M
  "M325,92 L325,0 L385,0 L385,16 L350,16 L350,38 L380,38 L380,54 L350,54 L350,92 Z", // F
  "M400,94 L400,0 L425,0 L425,78 L460,78 L460,94 Z", // L
  "M475,96 L475,0 L500,0 L500,96 Z", // I
  "M515,100 L545,45 L515,0 L540,0 L560,35 L580,0 L605,0 L575,45 L605,100 L580,100 L560,60 L540,100 Z", // X
];

const navVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

const logoVariants: Variants = {
  start: {
    fillOpacity: 0,
  },
  end: {
    fillOpacity: 1,
    transition: {
      duration: 1,
      delayChildren: stagger(0.1, { startDelay: 0.2, from: "first" }),
    },
  },
};

const letterVariants: Variants = {
  start: {
    opacity: 0,
    pathLength: 0,
  },
  end: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
    },
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const navScrollControls = useAnimation();
  const isLayoutReady = useLayoutReady();
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollY.get() > 80) {
      navScrollControls.start("scroll");
    } else {
      navScrollControls.start("top");
    }
  }, [scrollY, navScrollControls]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      navScrollControls.start("scroll");
    } else {
      navScrollControls.start("top");
    }
  });

  const toggleSearch = () => {
    if (!searchOpen) {
      setFocus("keyword");
      setValue("keyword", "");
    }
    setSearchOpen((prev) => !prev);
  };

  const onVaild = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  const barTransition = isLayoutReady ? {} : { duration: 0 };

  return (
    <Nav variants={navVariants} initial="top" animate={navScrollControls}>
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 615 110"
          variants={logoVariants}
          initial="start"
          animate="end"
        >
          {logoPaths.map((path, index) => (
            <motion.path key={index} d={path} variants={letterVariants} />
          ))}
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {homeMatch && <ItemBottomBar layoutId="itemBottomBar" transition={barTransition} />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows
              {tvMatch && <ItemBottomBar layoutId="itemBottomBar" transition={barTransition} />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <SearchForm onSubmit={handleSubmit(onVaild)}>
          <SearchSVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -195 : 0 }}
            transition={{ ease: "linear" }}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </SearchSVG>
          <SearchInput
            placeholder="Search for movie or tv show..."
            initial={{ opacity: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0, opacity: searchOpen ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 }, ease: "linear" }}
            {...register("keyword", { required: true, minLength: 2 })}
          />
        </SearchForm>
      </Col>
    </Nav>
  );
}

export default memo(Header);
