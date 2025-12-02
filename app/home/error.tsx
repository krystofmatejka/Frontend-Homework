'use client';

export default function HomeError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="primary-button">Try again</button>
    </div>
  )
}
