'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/notes';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form className={css.formContainer}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" />
            <ErrorMessage name="title" component="span" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} />
            <ErrorMessage name="content" component="span" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" />
          </div>

          <div className={css.formActions}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
