
const UserBar = ({ user }) => {
    return (
        <div className="user-bar-container">
            <img className="user-icon" src="https://cdn-icons-png.flaticon.com/512/571/571064.png"></img>
            <h2 className="user-full-name">{user.full_name}</h2>
        </div>
    )
}

export default UserBar;