import { useOutletContext, useParams } from "react-router-dom";
import { users } from "../../db";

interface IDarkMode {
  darkMode: string;
}

function User() {
  const { userId } = useParams();
  const { darkMode } = useOutletContext<IDarkMode>();
  console.log(darkMode);

  return (
    <>
      <h1>
        User with it {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      <h3> DarkMode : {darkMode} </h3>
    </>
  );
}

export default User;
