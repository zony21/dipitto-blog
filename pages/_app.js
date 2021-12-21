import '../styles/global.min.css'
import { client } from '../libs/client';
import { React, useEffect, useState, useMemo } from "react";

export default function App({ Component, pageProps }) {
  const titlename = "Dipitto Blog"
  const [blogcont, setblogcont] = useState([]);
  useEffect(() => {
    client
      .get({
        endpoint: 'blog',
        queries: { limit: 300 }
      })
      .then((res) => setblogcont(res.contents));
  }, []);
  const [blogcat, setblogcat] = useState([]);
  useEffect(() => {
    client
      .get({
        endpoint: 'category',
      })
      .then((res) => setblogcat(res.contents));
  }, []);
  const [totalCount, settotalCount] = useState(0);
  useEffect(() => {
    client
      .get({
        endpoint: 'blog',
        queries: { limit: 300 }
      })
      .then((res) => settotalCount(res.totalCount));
  }, []);
  // 検索条件
  const [filterQuery, setFilterQuery] = useState({});
  const [filterCat, setFilterCat] = useState([]);
  const [archive, setArchive] = useState([]);
  useEffect(() => {
    client
      .get({
        endpoint: 'blog',
        queries: { limit: 300 }
      })
      .then((res) => setArchive(res.contents));
  }, []);
  //ページネーション
  //ブログ記事１ページ表示数
  const defopage = 6;
  const [pageCount, setpageCount] = useState(defopage);
  const [pageNaition, setpageNaition] = useState(0);
  const [active, setActive] = useState(0);
  const getNextpage = e => {
    const nowpage = e.target.value;
    setpageNaition(+pageCount * nowpage);
    setActive(nowpage)
  };
  // ソート条件
  const [sort, setSort] = useState({});
  const filteredTask = useMemo(() => {
    let tmpTasks = blogcont;
    // 入力した文字は小文字にする
    const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();
    // 絞り込み検索
    tmpTasks = tmpTasks.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.title &&
        String(row.title).toLowerCase().indexOf(filterTitle) === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.category_id &&
        row.category[0].id !== filterQuery.category_id
      ) {
        return false;
      }

      // checkboxテスト中
      if (
        filterCat.length > 0 &&
        filterCat.includes(row.category.id) == false
      ) {
        return false;
      }
      return row;
    });
    // ソート
    if (sort.key) {
      tmpTasks = tmpTasks.sort((a, b) => {
        a = a[sort.key];
        b = b[sort.key];
        return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
      });
    }

    return tmpTasks;
  }, [filterQuery, sort, blogcont, filterCat]);
  // 入力した情報をfilterQueryに入れる
  const handleFilter = e => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };
  console.log(filterQuery)
  //checkbox
  const catFilter = e => {
    if (filterCat.includes(e.target.value)) {
      setFilterCat(filterCat.filter(item => item !== e.target.value));
      setpageNaition(0)
      setpageCount(defopage)
    } else {
      setFilterCat([...filterCat, e.target.value]);
      setpageNaition(0)
      setpageCount(totalCount)
    }
  }
  return <Component {...pageProps} titlename={titlename} catFilter={catFilter} filterCat={filterCat} handleFilter={handleFilter} filterQuery={filterQuery} pageCount={pageCount} blogcat={blogcat} filteredTask={filteredTask} getNextpage={getNextpage} active={active} pageNaition={pageNaition} totalCount={totalCount} blogcont={blogcont} />
}