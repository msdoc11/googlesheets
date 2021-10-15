export const itemRender = (current, type, originalElement) => {
    const style= {
        color: "#8E8E8E" ,
        background: "#F5F5F5" ,
        border: 0,
        borderRadius: "0px 26px 26px 0px",
        padding: "4px 10px"
    }
    const style2 = {
        color: "#8E8E8E" ,
        background: "#F5F5F5" ,
        border: 0,
        borderRadius: "26px 0px 0px 26px",
        padding: "4px 10px"
    }
    if (type === 'prev') {
      return <a style={style2}>{"<<"}</a>;
    }
    if (type === 'next') {
      return <a style={style}>{">>"}</a>;
    }
    return originalElement;
}