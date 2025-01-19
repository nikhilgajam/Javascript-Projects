import Card from './Card'
import '../App.css'

export default function CardList({ cards }) {
  return (
    <div className='card-list'>
      {cards.map(card => <Card key={card.id} card={card} />)}
    </div>
  )
}
