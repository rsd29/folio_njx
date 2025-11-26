import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_FORM_TO = process.env.CONTACT_FORM_TO
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
    if (!resend || !CONTACT_FORM_TO) {
        return NextResponse.json(
            { message: 'Contact service not configured.' },
            { status: 500 }
        )
    }

    try {
        let email = ''
        let message = ''

        const contentType = request.headers.get('content-type') || ''

        if (contentType.includes('application/json')) {
            const body = await request.json()
            email = (body.email ?? '').trim()
            message = (body.message ?? '').trim()
        } else {
            const formData = await request.formData()
            email = String(formData.get('email') ?? '').trim()
            message = String(formData.get('message') ?? '').trim()
        }

        if (!email || !message) {
            return NextResponse.json(
                { message: 'Email and message are required.' },
                { status: 400 }
            )
        }

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [CONTACT_FORM_TO],
            subject: `Portfolio inquiry from ${email}`,
            replyTo: email,
            text: `From: ${email}\n\n${message}`,
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { message: 'Unable to send message.' },
            { status: 500 }
        )
    }
}

