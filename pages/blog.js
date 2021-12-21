import Link from 'next/link';
import React from 'react';
import Pagination from '../components/Pagination';
import Date from '../components/Date';
import Image from 'next/image'

function Blog(props) {
    return (
        <div className='blog_cont'>
            <div className='blog_in'>
                <ul className="blog">
                    {
                        props.filteredTask.filter((pana, index) => index >= props.pageNaition && index <= (props.pageCount - 1) + props.pageNaition).map((task, index) => {
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
                                            <ul className='tags'>
                                                {task.btag.map((ta, index) => <li key={index}><span>#</span>{ta.tag}</li>)}
                                            </ul>
                                        </a>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
                <Pagination active={props.active} classToggle={props.classToggle} pageCount={props.pageCount} totalCount={props.totalCount} getNextpage={props.getNextpage} />
            </div>
            <div className="filter_wrap">
                <div className="filter-box">
                    <div className="input-group">
                        <input type="text" name="title" className="form-input" placeholder="タイトル検索"
                            value={props.filterQuery.title || ''}
                            onChange={props.handleFilter}
                        />
                    </div>
                    <div className="input-group check-input">
                        <h3>Category</h3>
                        <div className="selectbox">
                            {
                                props.blogcat.map((item, index) => {
                                    return (
                                        <div className="cat" key={index}>
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                onChange={props.catFilter}
                                                checked={props.filterCat.includes(item.id)}
                                                id={`cat${index + 1}`}
                                            />
                                            <label htmlFor={`cat${index + 1}`}>
                                                {item.name}
                                            </label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    {/* <div className="input-group check-input">
                        <h3>Tags</h3>
                        <div className="selectbox">
                            <ul className="tags">
                                {
                                    props.blogtag.map((tg, index) => {
                                        return (
                                            <li key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={tg.id}
                                                    onChange={props.tagFilter}
                                                    checked={props.filterTag.includes(tg.id)}
                                                    id={`tag${index + 1}`}
                                                />
                                                <label htmlFor={`tag${index + 1}`}>
                                                    #{tg.tag}
                                                </label>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Blog
