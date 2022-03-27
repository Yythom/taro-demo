import { Fragment, memo } from "react"

const FlexItem = memo(({
    tip,
    content,
    style,
    classname
}: {
    tip: string,
    content: JSX.Element | string | number,
    style?: React.CSSProperties,
    classname?: string,
}) => {

    return content ?
        <div
            className={`fb flex_item padding ${classname}`}
            style={{ width: '100%', ...style }}
        >
            <div style={{ whiteSpace: 'nowrap' }}>{tip}</div>
            <Fragment>{content}</Fragment>
        </div> : null
    //  null 后续方便扩展
})

export default FlexItem