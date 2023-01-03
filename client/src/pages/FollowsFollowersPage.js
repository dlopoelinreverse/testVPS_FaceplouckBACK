import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FollowsFollowers from "../components/FollowingFollower/FollowsFollowers";
import { isEmpty } from "../utils/Utils";

const FollowsFollwersPage = ({ show }) => {
  const { userId } = useParams();
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="follows-followers page">
      <div className="hearder-button">
        <Link to={`../${userId}`}>
          <span className="icon-btn">
            <img src="/img/icons/chevron-left-solid.svg" alt="" />
          </span>
        </Link>
      </div>
      {userId && !isEmpty(usersData) && (
        <FollowsFollowers userId={userId} usersData={usersData} show={show} />
      )}
    </div>
  );
};

export default FollowsFollwersPage;
