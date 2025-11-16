'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'email' | 'password' | 'complete'>('email')
  const [emailValid, setEmailValid] = useState(false)
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  const VALID_EMAIL = 'martinamawiski@gmail.com'
  const VALID_PASSWORD = 'NubeEdlp93'

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email === VALID_EMAIL) {
      setEmailValid(true)
      setStep('password')
      setResult(null)
    } else {
      setResult('error')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === VALID_PASSWORD) {
      setResult('success')
      setStep('complete')
    } else {
      setResult('error')
    }
  }

  const handleReset = () => {
    setEmail('')
    setPassword('')
    setStep('email')
    setEmailValid(false)
    setResult(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Ingeniería Social</CardTitle>
          <CardTitle className="text-2xl font-bold text-center">Grupo 6</CardTitle>
          <CardDescription className="text-center">
            {step === 'email' && 'Paso 1: Ingresa tu correo electrónico'}
            {step === 'password' && 'Paso 2: Ingresa tu contraseña'}
            {step === 'complete' && 'Validación completada'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setResult(null)
                  }}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Validar Correo
              </Button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Correo validado correctamente
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setResult(null)
                  }}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                  Volver
                </Button>
                <Button type="submit" className="flex-1">
                  Validar Contraseña
                </Button>
              </div>
            </form>
          )}

          {result === 'success' && step === 'complete' && (
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  ¡Credenciales correctas! Acceso concedido.
                </AlertDescription>
              </Alert>
              <Button onClick={handleReset} variant="outline" className="w-full">
                Volver a intentar
              </Button>
            </div>
          )}

          {result === 'error' && (
            <Alert className="mt-4 border-destructive bg-destructive/10">
              <XCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                {step === 'email' ? 'Correo incorrecto. Intenta nuevamente.' : 'Contraseña incorrecta. Intenta nuevamente.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
