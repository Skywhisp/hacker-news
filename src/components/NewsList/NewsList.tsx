import React, { useCallback, useEffect, useState } from 'react';
import { getTopStories, getBestStories, getNewStories, getItem } from '../../api/api.ts';
import { Item } from '../../interfaces/item.ts';
import styles from '../../App.module.scss';
import NewsItem from '../NewsItem/NewsItem.tsx';

const NEWS_PER_PAGE: number = 30;

type StoryType = 'topstories' | 'beststories' | 'newstories';

const fetchStoriesMap = {
    topstories: getTopStories,
    beststories: getBestStories,
    newstories: getNewStories,
};

/**
 * Компонент списка новостей с пагинацией и сортировкой.
 *
 * @returns {JSX.Element} - Список новостей.
 */
const NewsList: React.FC = () => {
    const [storyType, setStoryType] = useState<StoryType>('topstories');
    const [storyIds, setStoryIds] = useState<number[]>([]);
    const [stories, setStories] = useState<Item[]>([]);
    const [page, setPage] = useState(1);

    /**
     * Загружает список ID историй на основе текущего типа историй.
     */
    const fetchStories = useCallback(async (): Promise<void> => {
        try {
            const fetchStoriesFunc = fetchStoriesMap[storyType];
            const ids: number[] = await fetchStoriesFunc();
            setStoryIds(ids);
        } catch (error) {
            console.error(error);
        }
    }, [storyType]);

    useEffect((): void => {
        fetchStories();
    }, [storyType, fetchStories]);

    useEffect((): void => {
        const fetchPageStories = async (): Promise<void> => {
            try {
                const startIndex: number = (page - 1) * NEWS_PER_PAGE;
                const endIndex: number = startIndex + NEWS_PER_PAGE;
                const stories: Item[] = await Promise.all(storyIds.slice(startIndex, endIndex).map(id => getItem(id)));
                setStories(prevStories => [...prevStories, ...stories]);
            } catch (error) {
                console.error(error);
            }
        };
        if (storyIds.length > 0) {
            fetchPageStories();
        }
    }, [page, storyIds]);

    /**
     * Обработчик загрузки следующей страницы историй.
     */
    const handleLoadMore = (): void => {
        setPage(prevPage => prevPage + 1);
    };

    /**
     * Обработчик смены типа историй.
     *
     * @param {StoryType} type - Новый тип историй.
     */
    const handleStoryTypeChange = (type: StoryType): void => {
        setStoryType(type);
        setStories([]);
        setPage(1);
    };

    return (
        <div className={styles.newsList}>
            <div className={styles.buttonGroup}>
                <button onClick={() => handleStoryTypeChange('topstories')}>Топ</button>
                <button onClick={() => handleStoryTypeChange('beststories')}>Лучшие</button>
                <button onClick={() => handleStoryTypeChange('newstories')}>Новые</button>
            </div>
            {stories.map(story => (
                <NewsItem key={story.id} story={story} />
            ))}
            {page * NEWS_PER_PAGE < storyIds.length && (
                <div className={styles.loadMore}>
                    <button onClick={handleLoadMore}>Показать больше</button>
                </div>
            )}
        </div>
    );
};

export default NewsList;
