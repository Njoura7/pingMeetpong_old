const SignUp = () => {
  return (
    <>
      <form>
        <label>
          Username:
          <input
            type='text'
            name='_id'
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
          />
        </label>
        <label>
          Confirm Password:
          <input
            type='password'
            name='confirm-password'
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

export default SignUp
