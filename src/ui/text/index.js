export const Text =  ({ children, color = false, weight = false, size = false, line = "" }) => {
    const style = {
        color: color ? color : "#232323",
        fontWeight: weight ? weight : 400,
        fontFamily: `'Roboto', sans-serif`,
        margin: 0,
        fontSize: size ? size : "18px",
        lineHeight: line
    }
    return (
        <p style={style}>{ children }</p>
    )
}