import { compose, withState, withHandlers, lifecycle } from 'recompose';
import axios from 'axios';
import { API } from './constants';
import CardComponent from './CardComponent';

const getImages = () => axios.get(API);

const handleStart = ({ cards, isStarted, setCards, setStarted }) => () => {
  setCards(
    cards
      .map(({ ...props }) => ({ ...props, isSelected: false }))
      .sort(function() {
        return 0.5 - Math.random();
      })
  );

  setStarted(!isStarted);
};

const handleSelectCard = ({ cards, setCards }) => imageName => {
  const cardSelected = cards.find(({ name }) => name === imageName);
  const lastCardSelected = cards.find(({ isSelected }) => isSelected);
  cards[cards.indexOf(cardSelected)] = { ...cardSelected, isSelected: true };
  cards[cards.indexOf(lastCardSelected)] = {
    ...lastCardSelected,
    isSelected: false
  };

  setCards(cards);
};

export default compose(
  withState(`cards`, `setCards`, []),
  withState(`isStarted`, `setStarted`, false),
  withHandlers({ handleStart, handleSelectCard }),
  lifecycle({
    componentDidMount() {
      const { setCards } = this.props;

      getImages().then(({ data: { cards } }) => {
        setCards(
          cards.map(({ image, name }) => ({
            image,
            name,
            isSelected: false
          }))
        );
      });
    }
  })
)(CardComponent);
