'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const tags = ['All notes', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  const segment = useSelectedLayoutSegment();

  return (
    <aside style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px' }}>
      <ul className={css.menuList}>
        {tags.map((tag) => {
          const href = `/notes/filter/${tag.toLowerCase().replace(' ', '-')}`;
          const isActive = segment === tag.toLowerCase().replace(' ', '-');
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={`${css.menuLink} ${isActive ? css.active : ''}`}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}