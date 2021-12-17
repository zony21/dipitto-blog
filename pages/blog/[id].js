import Date from "../../components/Date";
import { client } from "../../libs/client";
import Layout from '../../components/layout'
import Link from "next/link";
import Head from "next/head";

export default function BlogId({ blog, titlename, blogcont }) {
  return (
    <Layout>
      <Head>
        <title>{titlename}|{blog.title}</title>
        <meta name="twitter:title" content={`${titlename}|${blog.title}`} />
        <meta name="twitter:image" content={blog.image == undefined ? "/images/noimage.jpg" : blog.image.url} />
      </Head>
      <div className="cont_wrap blog_wrap">
        <div className="blog_cont">
          <div className="blog_in">
            <div className="main_img">
              {blog.image == undefined ? "" : <img src={blog.image.url} />}
            </div>
            <div className="det">
              <div className="categ">{blog.category.name}</div>
              <div className="date">
                <Date dateString={blog.publishedAt} />
              </div>
            </div>
              <ul className="tags">
                {blog.tag.map((ta, index) => <li key={index}><span>#</span>{ta}</li>)}
              </ul>
            <h2>{blog.title}</h2>
            <div className="content"
              dangerouslySetInnerHTML={{
                __html: `${blog.main}`,
              }}
            />
            <div className="linkbox">
              <a href={blog.link}>{blog.linktl}</a>
            </div>
          </div>
          <div className="filter_wrap">
            <div className="filter-box">
              <h3>PickUp</h3>
              <ul className="blog pick_list">
                {
                  blogcont.filter((pana, index) => index <= 4 && pana.category.name == blog.category.name && pana.id != blog.id).map((task, index) => {
                    return (
                      <li className='blog_list' key={index} id={`index${index + 1}`}>
                        <Link href={`/blog/${task.id}`}>
                          <a>
                            <div className="img_box">
                              <div className="img">
                                {task.image == undefined ? <img src="/images/noimage.jpg" /> : <img src={task.image.url} />}
                              </div>
                              <div className='categ'>
                                {task.category.name}
                              </div>
                            </div>
                            <Date dateString={task.publishedAt} />
                            <div className='tl'>{task.title}</div>
                          </a>
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
              <Link href="/"><a className="backlink">一覧へ</a></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};