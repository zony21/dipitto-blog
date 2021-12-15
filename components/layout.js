import styles from './layout.module.css'
import Headcom from './Headcom'

export default function Layout({ children }) {
    return <div className={styles.container}><Headcom/>{children}</div>
}