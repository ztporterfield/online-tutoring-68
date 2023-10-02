import React from "react"
import { useParams } from "react-router-dom"

export default function TutorProfilePage() {
    let { id } = useParams()
    const tutor = fetchTutor(id)
    return (
        <div className="flex flex-col gap-2 bg-gray-100 rounded-lg py-8 px-10 shadow-lg">
            <img src={tutor.profile_picture_url} className="rounded-xl w-1/2" />
            <h1 className="text-3xl font-bold ">
                {tutor.last_name}, {tutor.first_name}
            </h1>
            <p className="bg-gray-300 p-2 rounded-lg">
                {tutor.bio}
            </p>
            <div>
                <h2 className="text-xl font-bold">
                    Subjects
                </h2 >
                <ul className="flex gap-2">
                    {tutor.subjects.map((subject) => (<li className="bg-blue-600 text-white px-2 py-1 rounded-lg">{subject}</li>))}
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-bold">
                    General availability
                </h2>
                <h3>
                    Start: {tutor.available_hours_start} End: {tutor.available_hours_end}
                </h3>
            </div>
            <div>
                <h2 className="text-xl font-bold">
                    Bookings
                </h2>
            </div>
        </div>
    )
}

function fetchTutor(id) {
    //TO DO: Change this to use the API
    return {
        id: id,
        first_name: "Alex",
        last_name: "Hat",
        bio: "I am a maths tutor I am a maths tutor I am a maths tutor I am a maths tutor I am a maths tutor I am a maths tutor",
        profile_picture_url: "https://fastly.picsum.photos/id/1/200/200.jpg?hmac=jZB9EZ0Vtzq-BZSmo7JKBBKJLW46nntxq79VMkCiBG8",
        subjects: ["Biology", "Chemistry", "Maths"],
        available_hours_start: "12:00",
        available_hours_end: "3:00"
    }
}