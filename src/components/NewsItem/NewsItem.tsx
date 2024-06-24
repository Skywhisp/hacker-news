import React, { useState } from 'react';
import { Item } from '../../interfaces/item.ts';
import styles from './NewsItem.module.scss';
import Comments from '../Comments/Comments.tsx';

interface NewsItemProps {
    story: Item;
}

/**
 * Компонент элемента новостей.
 *
 * @param {NewsItemProps} props - Свойства компонента.
 * @returns {JSX.Element} - Элемент новостей.
 */
const NewsItem: React.FC<NewsItemProps> = ({ story }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className={styles.NewsItem}>
            <h3><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h3>
            <p>Автор: {story.by}</p>
            <p>Рейтинг: {story.score}</p>
            <button className={styles.commentsButton} onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>
            {showComments && <Comments kids={story.kids || []} />}
        </div>
    );
};

export default NewsItem;
