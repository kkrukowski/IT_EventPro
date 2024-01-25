import Heading from './components/Heading'
import EventItem from './components/EventItem'

export default function Home() {
  return (
    <main className="flex flex-col items-center p-10">
      <Heading title="Dostępne wydarzenia" />
      <section className='p-4 rounded-xl max-h-[800px] overflow-auto'>
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
        <EventItem eventTitle="Tytuł" eventDesc='Opis wydarzenia' eventDate='24-02-2024' eventLoc='Katowice, Spodek' />
      </section>      
    </main>
  )
}
