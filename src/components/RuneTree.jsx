import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoint, removePoint } from '../redux/runeSlice';
import styles from '../styles/styles.module.css';

const runes = [
    { id: 'stack', label: 'Stack Talent' },
    { id: 'fork', label: 'Fork Talent' },
    { id: 'cake', label: 'Cake Talent' },
    { id: 'crown', label: 'Crown Talent' },
    { id: 'helmet', label: 'Helmet Talent' },
    { id: 'goggles', label: 'Goggles Talent' },
    { id: 'lightning', label: 'Lightning Talent' },
    { id: 'skull', label: 'Skull Talent' },
];

const RuneTree = () => {
    const dispatch = useDispatch();
    const { selectedRunes, pointsSpent, maxPoints } = useSelector((state) => state.rune);

    const handleClick = (id, event) => {
        event.preventDefault();
        if (event.type === 'click') {
            dispatch(addPoint(id));
        } else if (event.type === 'contextmenu') {
            dispatch(removePoint(id));
        }
    };

    return (
        <div className={styles.treeContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
                </div>
            </div>

            {/* Talent Tree */}
            <div className={styles.tree}>
                <div className={styles.pathLabels}>
                    <p className={styles.pathLabel}>TALENT PATH 1</p>
                    <p className={styles.pathLabel}>TALENT PATH 2</p>
                </div>
                <div className={styles.grid}>
                    {runes.map(({id, label}) => {
                        const isSelected = selectedRunes.includes(id);
                        return (
                            <div
                                key={id}
                                className={`${styles.rune} ${styles[id]} ${isSelected ? styles.selected : styles.unselected}`}
                                onClick={(e) => handleClick(id, e)}
                                onContextMenu={(e) => handleClick(id, e)}
                                title={label}
                            />
                        );
                    })}
                </div>
                <div className={styles.pointsCounter}>
                    <p className={styles.pointsSpent}>{pointsSpent} / {maxPoints}</p>
                    <p className={styles.pointsLabel}>Points Spent</p>
                </div>
            </div>

        </div>
    );
};

export default RuneTree;
