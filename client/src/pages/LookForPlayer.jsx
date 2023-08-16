import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function LookForPlayer() {
  return (
    <>
      <h1>Look For Player</h1>

      <div className='search'>
        <input
          type='text'
          className='searchTerm'
          placeholder='Look for a player'
        />
        <button
          type='submit'
          className='searchButton'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='l'
            style={{ color: "#ccc" }}
          />
        </button>
      </div>
    </>
  )
}

export default LookForPlayer
