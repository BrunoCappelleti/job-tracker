class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :position
      t.boolean :status
      t.string :contact_name
      t.string :contact_email
      t.string :contact_phone
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
