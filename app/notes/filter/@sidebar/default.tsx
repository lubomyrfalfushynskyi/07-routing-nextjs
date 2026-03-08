import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const tags = ['All notes', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <aside style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px' }}>
      <ul className={css.menuList}>
        {tags.map((tag) => {
                        const href = `/notes/filter/${encodeURIComponent(tag)}`;          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}