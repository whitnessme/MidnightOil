
const UserBar = ({ user }) => {
    return (
        <div className="user-bar-container">
            <img alt="knight painting icon" className="user-icon" src="../../../../static/knight_painting_crop.png"></img>
            <h2 className="user-full-name">{user.full_name}</h2>
        </div>
    )
}

export default UserBar;