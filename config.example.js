module.exports = {
    config: {
        'my-custom-label': {
            from: '*@somesite.com', // match all mail from somesite.com
        },
        'another-custom-label': {
            from: '', // explicitly specifying empty value here to prevent auto-generation from the domain-based label
            match: 'whatever', // match this
            neMatch: 'something else', // don't match that
            read: true, // default value: false
            archive: false, // default value: true
        },
        'github.com': { // if 'from' is not specified, it will be auto-generated from the label name
            labels: { // you can add sub-labels (and probably sub-sub-labels too), by default they inherit 'from', 'match' and 'neMatch' from parents
                'mentions': {
                    match: '((&quot;YOUR_GH_NAME&quot;) OR (&quot;requested your review on&quot;) OR (&quot;requested review from @YOUR_ORG/YOUR_TEAM on&quot;) OR (&quot;You are receiving this because you authored the thread&quot;)) AND -(&quot;as a code owner&quot;)',
                },
                'PR fails': {
                    match: '(&quot;PR run failed&quot;)',
                },
                'junk': {
                    match: '-((&quot;PR run failed&quot;) OR (&quot;YOUR_GH_NAME&quot;) OR (&quot;requested your review on&quot;) OR (&quot;requested review from @YOUR_ORG/YOUR_TEAM on&quot;) OR (&quot;You are receiving this because you authored the thread&quot;)) OR (&quot;as a code owner&quot;)',
                    read: true, // exterminate all these non-important emails at sight
                },
            },
        },
        'google.com': {}, // all mail from google.com goes to google.com label
        'mail.notion.so': {}, // same here
        'yourcompany.atlassian.net': { // long an ugly, maybe you could use 'jira' as label and '*@yourcompany.atlassian.net' as 'from' instead
            labels: {
                'mentions': { // highlight mentions into a separate sub-label
                    match: '(&quot;mentioned you on&quot;)',
                },
            },
        },
    },
}