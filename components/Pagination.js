function Pagination(props) {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  return (
    <div>
      <ul className="pagenation">
        {range(1, Math.ceil(props.totalCount / props.pageCount)).map((number, index) => (
          <li key={index} value={index} onClick={props.getNextpage} className={props.active == index ? 'active' : ''}>
            {number}
          </li>
        ))}
      </ul>
      <div className="count">全<span>{props.totalCount}</span>記事</div>
    </div>
  )
}

export default Pagination
