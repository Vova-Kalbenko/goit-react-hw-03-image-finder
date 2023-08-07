    import PropTypes from 'prop-types';
    import css from './Button.module.css';

    const LoadMoreButton = ({onButtonClick}) => {
        return (
            <div>
                <button type='button' className={css.button} onClick={onButtonClick}>
                    Load more
                </button>
            </div>
        );
    };

    LoadMoreButton.propTypes = {
        onButtonClick: PropTypes.func,
    };

    export default LoadMoreButton;