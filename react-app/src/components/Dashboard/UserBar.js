
const UserBar = ({ user }) => {
    return (
        <div className="user-bar-container">
            <img className="user-icon" src="https://cdn-icons-png.flaticon.com/512/571/571064.png"></img>
            <p>{user.full_name}</p>
        </div>
    )
}

export default UserBar;