import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, BookOpen, Loader2, Star } from "lucide-react"
import { Course } from "@/hooks/admin/useCourses"

interface CourseListProps {
  courses: Course[]
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
  onToggleAvailability: (id: string) => void
  loading?: boolean
}

export function CourseList({
  courses,
  onEdit,
  onDelete,
  onToggleAvailability,
  loading = false
}: CourseListProps) {
  if (loading && courses.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Cargando cursos...</span>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay cursos disponibles
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {courses.map((course) => (
        <Card key={course._id} className={!course.is_available ? "opacity-60" : ""}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-black">{course.title}</h3>
                  <Badge variant="outline">{course.level}</Badge>
                  {!course.is_available && <Badge variant="destructive">No disponible</Badge>}
                </div>
                <p className="text-gray-600 mb-3">{course.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Instructor: {course.instructor}</span>
                  <span>Duración: {course.duration}</span>
                  <span>Precio: ${course.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{course.rating}/5</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onToggleAvailability(course._id!)}
                  disabled={loading}
                >
                  {course.is_available ? "Ocultar" : "Mostrar"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(course)}
                  disabled={loading}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDelete(course._id!)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 