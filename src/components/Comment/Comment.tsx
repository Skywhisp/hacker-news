import React from 'react';
import { Item } from '../../interfaces/item.ts';
import styles from './Comment.module.scss';
import Comments from '../Comments/Comments.tsx';

/**
 * Компонент комментария.
 *
 * @param {Item} comment - Данные комментария.
 * @returns {JSX.Element} - Комментарий.
 */
const Comment: React.FC<{ comment: Item }> = ({ comment }) => {
    return (
        <div className={styles.comment}>
            <strong>{comment.by}</strong>
            <p dangerouslySetInnerHTML={{ __html: comment.text || '' }} />
            {comment.kids && <Comments kids={comment.kids} />}
        </div>
    );
};

export default Comment;
