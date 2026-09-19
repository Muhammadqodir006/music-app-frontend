import Link from "next/link"
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>🎵 Musiqa</Link>
            <Link href="/add-song" className={styles.addLink} aria-label="Qo'shiq qo'shish">+</Link>
        </nav>
    );
}