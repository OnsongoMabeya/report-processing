// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        }
    },
    usePathname() {
        return ''
    },
    useSearchParams() {
        return new URLSearchParams()
    },
}))

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img {...props} />
    },
}))

// Mock environment variables
process.env.MONGODB_URI = 'mongodb://localhost:27017/report-processing-test'
process.env.EMAIL_HOST = 'smtp.gmail.com'
process.env.EMAIL_PORT = '587'
process.env.EMAIL_USER = 'test@example.com'
process.env.EMAIL_PASSWORD = 'test-password'
process.env.ALLOWED_SENDERS = 'test@example.com'
process.env.CHECK_INTERVAL = '300000'

// Suppress console.error in tests
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: ReactDOM.render is no longer supported')
        ) {
        return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
}) 