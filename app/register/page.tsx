import { supabase } from '@/lib/supabaseClient'


const email = 'user@example.com'; // Replace with actual value from form/input
const password = 'yourPassword';  // Replace with actual value from form/input

const { data, error } = await supabase.auth.signUp({
  email,
  password
})

const user = data.user

if (user) {
  await supabase.from('profiles').insert({
    id: user.id,
    role: 'user' // or 'admin'
  })
}

export {}