import styled from "styled-components";
import { motion, type Variants } from "motion/react";
import { Link, useMatch } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
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
  flex-direction: column;
  position: relative;
`;

const ItemBottomBar = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.red};
  position: absolute;
  bottom: -5px;
`;

const logoVariants: Variants = {
  start: {
    pathLength: 0,
    fillOpacity: 0,
  },
  end: {
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 5 },
      fillOpacity: { duration: 3 },
    },
  },
};

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");

  return (
    <Nav>
      <Col>
        <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 615 110">
          <motion.path
            d="M10,100 L10,0 L35,0 L75,65 L75,0 L100,0 L100,96 L75,96 L35,30 L35,98 Z
    M115,50 C115,20 130,0 155,0 C180,0 195,20 195,50 C195,85 180,94 155,94 C130,94 115,85 115,50 Z
    M135,50 C135,70 140,78 155,78 C170,78 175,70 175,50 C175,30 170,16 155,16 C140,16 135,30 135,50 Z
    M210,92 L210,0 L235,0 L260,60 L285,0 L310,0 L310,92 L285,92 L285,35 L260,92 L235,35 L235,92 Z
    M325,92 L325,0 L385,0 L385,16 L350,16 L350,38 L380,38 L380,54 L350,54 L350,92 Z
    M400,94 L400,0 L425,0 L425,78 L460,78 L460,94 Z
    M475,96 L475,0 L500,0 L500,96 Z
    M515,100 L545,45 L515,0 L540,0 L560,35 L580,0 L605,0 L575,45 L605,100 L580,100 L560,60 L540,100 Z"
            variants={logoVariants}
            initial="start"
            animate="end"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {homeMatch && <ItemBottomBar />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows
              {tvMatch && <ItemBottomBar />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <button>Search</button>
      </Col>
    </Nav>
  );
}

export default Header;
