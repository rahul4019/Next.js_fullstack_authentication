import { NextRequest, NextResponse } from 'next/server';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
 
    // find the user in DB using email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    // send reset email
    await sendEmail({ email, emailType: 'RESET', userId: user._id });

    return NextResponse.json({
      message: 'Reset link has been sent to your email',
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
