export async function login(dispatch, credentials) {
    try {
        const response = await fetch(
        'http://localhost:3030/users/login',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        }
        );

        if (!response.ok) {
        //throw new Error('Invalid credentials');
        console.log('Invalid credentials');
        }

        const data = await response.json();

        console.log('LOGIN RESPONSE:', data);

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                user: {
                id: data._id,
                email: data.email
                },
            accessToken: data.accessToken
          }
        });

        return data;
    } catch (error) {
        console.error('Login error:', error);
        //throw error;
    }
}

export async function register(dispatch, data) {
  try {
    const response = await fetch(
      'http://localhost:3030/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      }
    );

    if (!response.ok) {
      //throw new Error('Invalid credentials');
      console.log('Invalid credentials');
    }

    const data = await response.json();

    console.log('Registration RESPONSE:', data);

    // dispatch({
    //     type: "LOGIN_SUCCESS",
    //     payload: {
    //         user: {
    //         id: data._id,
    //         email: data.email
    //         },
    //     token: data.accessToken
    //   }
    // });

    return data; // 🔑 IMPORTANT
  } catch (error) {
    console.error('Login error:', error);
    //throw error;
  }
}


