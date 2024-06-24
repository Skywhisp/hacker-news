import React, { useEffect, useState } from 'react';
import { getItem } from '../../api/api.ts';
import styles from './Comments.module.scss';
import { Item } from '../../interfaces/item.ts';
import Comment from '../Comment/Comment.tsx';

interface CommentsProps {
    kids: number[];
}

/**
 * Компонент комментария.
 *
 * @param {Item} comment - Данные комментария.
 * @returns {JSX.Element} - Комментарий.
 */
const Comments: React.FC<CommentsProps> = ({ kids }) => {
    const [comments, setComments] = useState<Item[]>([]);

    useEffect((): void => {
        const fetchComments = async (): Promise<void> => {
            try {
                const fetchedComments: Item[] = await Promise.all(kids.map(id => getItem(id)));
                setComments(fetchedComments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [kids]);

    return (
        <div className={styles.comments}>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
