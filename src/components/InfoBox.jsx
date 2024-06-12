let cardStyle = {
  width: "18em",
  borderRadius: ".5em",
  backgroundColor: "#555",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  fontSize: "1.5em",
  color: "#fff",
  padding: ".5em",
};
let iconStyle = {
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#555",
  marginBottom: "1em",
};
let spanStyle = {
  position: "absolute",
  top: "-.8em",
  backgroundColor: "#555",
  fontSize: "3em",
  width: "5rem",
  height: "5rem",
  padding: "0",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};
function InfoBox({ icon = "?", iconColor = "#fff", children }) {
  const newspanStyle = { ...spanStyle, color: iconColor };
  return (
    <div style={cardStyle}>
      <div style={iconStyle}>
        <span style={newspanStyle}>{icon}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
export default InfoBox;
