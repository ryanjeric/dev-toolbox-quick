import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Coffee, Code, Users, Lightbulb } from "lucide-react";

export function AboutDeveloper() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Code className="h-6 w-6 text-blue-600" />
            About the Developer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg">
            <p className="mb-4">
              Hello! I'm <strong className="text-blue-600">Ryan Jeric</strong>, a Software Engineer with a strong passion for coding, collaboration, and taking on new challenges. I enjoy experimenting with code and thrive in team environments where creative problem-solving is key.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Technical Skills</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  My skill set spans across design, front-end development (HTML, CSS, JavaScript), and back-end development using Python.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Code Quality</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I take pride in writing clean, well-structured, and properly formatted code.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Collaboration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I'm a collaborative team player who quickly adapts to different technologies, frameworks, and methodologies.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <Coffee className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-orange-700 dark:text-orange-300">
              Enjoying the tools?
            </h3>
            <p className="text-sm text-orange-600 dark:text-orange-400 mb-4">
              If these developer tools have been helpful to you, consider buying me a food! ☕
            </p>
            <Button 
              onClick={() => window.open("https://buymeacoffee.com/ryanjericsabado", "_blank")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Coffee className="h-4 w-4 mr-2" />
              Buy me a food!
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Thank you for using Web-Toolbox! I hope these tools make your development workflow more efficient.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 