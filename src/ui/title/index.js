export const TitleText = ({ children, none = false }) => {
    const style = {
        color: "#828282",
        fontWeight: 700,
        fontSize: 32,
        fontFamily: `'Roboto', sans-serif`,
        fontStyle: "normal",
        paddingLeft: none ? 10 : 30,
        textTransform: "uppercase",
        margin: 0,
        marginBottom: 10
    }
    return (
        <p style={style}>{ children }</p>
    )
}