const JoinEvent = () => {
  return (
    <>
      <form>
        <label>
          EventID:
          <input
            type='text'
            name='event-id'
          />
        </label>
        <label>
          enter your username:
          <input
            type='text'
            name='participant-username'
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    </>
  )
}

export default JoinEvent
