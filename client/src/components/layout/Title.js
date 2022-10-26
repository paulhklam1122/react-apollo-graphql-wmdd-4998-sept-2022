const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: "15px",
    marginBottom: "50px"
  }
});

const Title = () => {
  const style = getStyles();

  return <h1 style={style.title}>People and Their Cars</h1>;
};

export default Title;
