import Image from 'next/image'
import { Button } from 'flowbite-react';

export default function EventItem(props: {eventTitle: string, eventDesc: string, eventDate: string, eventLoc: string}) {
    return (
        <div className='flex h-fit w-[600px] mb-5 bg-gray-800 p-4 rounded-3xl'>
          <Image
            src="/thumbnail.jpg"
            alt="Event thumbnail"
            className='rounded-xl mr-8'
            width="250"
            height="250"
          />
          <div className='flex flex-col flex-1'>
            <div className='flex flex-col h-full flex-1'>
                <span>📅 {props.eventDate} | 📌 {props.eventLoc}</span>
                <h2 className="text-2xl font-bold">{props.eventTitle}</h2>
                <p>{props.eventDesc}</p>
            </div>
            <div className='flex'>
                <Button className='w-fit mt-5 mr-5'>Zapisz się</Button>
                <Button color="blue" className='w-fit mt-5'>Pobierz bilet</Button>
            </div>
          </div>
        </div>
    )
}