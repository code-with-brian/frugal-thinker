import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ }) => {
    const headers = new Headers({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        client_id: import.meta.env.STRAVA_CLIENT_ID,
        client_secret: import.meta.env.STRAVA_SECRET,
        refresh_token: import.meta.env.STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
    });
    
    const reauthorizeResponse = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body
    });
    
    if (!reauthorizeResponse.ok) {
        console.error('Reauthorization error:', await reauthorizeResponse.text());
        return new Response(JSON.stringify({ error: "Failed to reauthorize with Strava." }), {
            status: reauthorizeResponse.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    

    const reAuthJson = await reauthorizeResponse.json();

    const activitiesResponse = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthJson.access_token}&per_page=30`, {
        headers: headers
    });

    if (!activitiesResponse.ok) {
        console.error('Failed to retrieve activities:', await activitiesResponse.text());
        return new Response(JSON.stringify({ error: "Failed to retrieve athlete activities." }), {
            status: activitiesResponse.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const activities = await activitiesResponse.json();

    return new Response(JSON.stringify(activities), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
