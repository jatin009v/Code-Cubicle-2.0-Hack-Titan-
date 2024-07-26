function Card({amount, date, time}) {
  return (
    <div className="m-2 p-4 bg-slate-400 w-80 h-40 rounded-md">
        <h3 className="text-6xl mt-3 font-light">₹{amount.toLocaleString()}</h3>
        <div className="flex justify-end items-center gap-2">
          <p className="mt-7 flex justify-end">{date}</p>
          <p className="mt-7 flex justify-end">{time}</p>
        </div>
    </div>
  )
}

export default Card