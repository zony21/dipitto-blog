import styles from './layout.module.css'
import Headcom from './Headcom'

export default function Layout({ children }) {
    return <div><h1>Dipitto Blog</h1><div className={styles.container}><Headcom/>{children}</div></div>
}