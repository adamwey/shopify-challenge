export function Header() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>The Shoppies</h1>
        <p>
          It&apos;s that time of the year to choose your Shoppies nominations{' '}
          <span role='img' aria-label='popcorn emoji'>
            🍿
          </span>
        </p>
      </div>

      <div className='text-grey-200'>
        <p className='text-sm'>
          Select your top <strong className='text-green-500'>5 movies</strong> of the
          year using the search bar below, use the save button to save your choices!
        </p>
      </div>
    </div>
  );
}
