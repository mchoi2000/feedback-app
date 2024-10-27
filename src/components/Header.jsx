import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function Header({ text = "Feedback UI" }) {
  return (
    <header>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.protoTypes = {
  text: PropTypes.string.isRequired,
};
export default Header;
