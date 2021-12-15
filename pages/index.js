import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Blog from './blog'

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>Dipitto Blog</title>
      </Head>
      <h1>Dipitto Blog</h1>
      <div className="blog_wrap">
        <div className="box">
          <Blog catFilter={props.catFilter} filterCat={props.filterCat} blogcat={props.blogcat} filterQuery={props.filterQuery} totalCount={props.totalCount} active={props.active} getNextpage={props.getNextpage} filteredTask={props.filteredTask} pageCount={props.pageCount} pageNaition={props.pageNaition} />
        </div>
      </div>
    </Layout>
  )
}
