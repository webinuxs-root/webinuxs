export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banner: {
        Row: {
          alt: string
          category: string
          created_at: string
          id: string
          image: string
          link: string | null
          position: number
          title: string
        }
        Insert: {
          alt: string
          category: string
          created_at?: string
          id?: string
          image: string
          link?: string | null
          position: number
          title: string
        }
        Update: {
          alt?: string
          category?: string
          created_at?: string
          id?: string
          image?: string
          link?: string | null
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_banner_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign: {
        Row: {
          alt: string
          created_at: string
          end_in: string | null
          id: string
          image: string
          start_price: number | null
          title: string
        }
        Insert: {
          alt: string
          created_at?: string
          end_in?: string | null
          id?: string
          image: string
          start_price?: number | null
          title: string
        }
        Update: {
          alt?: string
          created_at?: string
          end_in?: string | null
          id?: string
          image?: string
          start_price?: number | null
          title?: string
        }
        Relationships: []
      }
      campaign_join: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          product_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          product_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_campaign-join_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_campaign-join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string
          name: string
          position: number
          slug: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image: string
          name: string
          position: number
          slug: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          name?: string
          position?: number
          slug?: string
        }
        Relationships: []
      }
      client_review: {
        Row: {
          alt: string
          created_at: string
          description: string
          id: string
          image: string
          title: string
        }
        Insert: {
          alt: string
          created_at?: string
          description: string
          id?: string
          image: string
          title: string
        }
        Update: {
          alt?: string
          created_at?: string
          description?: string
          id?: string
          image?: string
          title?: string
        }
        Relationships: []
      }
      coupon: {
        Row: {
          code: string | null
          created_at: string
          discount: number | null
          discount_unit: string | null
          id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          discount?: number | null
          discount_unit?: string | null
          id?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          discount?: number | null
          discount_unit?: string | null
          id?: string
        }
        Relationships: []
      }
      email_subscriber: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      feature_product: {
        Row: {
          id: string
          product_id: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_feature_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      order_products: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          price: number | null
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_products_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          country: string | null
          coupon_discount: number | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          order_id: string | null
          our_notes: string | null
          phone: string | null
          purchase_notes: string | null
          state: string | null
          status: string | null
          subtotal: number | null
          total: number | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          coupon_discount?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          order_id?: string | null
          our_notes?: string | null
          phone?: string | null
          purchase_notes?: string | null
          state?: string | null
          status?: string | null
          subtotal?: number | null
          total?: number | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          coupon_discount?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          order_id?: string | null
          our_notes?: string | null
          phone?: string | null
          purchase_notes?: string | null
          state?: string | null
          status?: string | null
          subtotal?: number | null
          total?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          brand: string
          category: string
          created_at: string
          description: string
          discount: number
          discount_unit: string
          documentation: boolean | null
          features: string
          id: string
          image_1: string
          image_2: string | null
          image_3: string | null
          image_4: string | null
          image_5: string | null
          included: string
          keyword: string | null
          layout: boolean | null
          payment: string
          preview_note: string | null
          preview_url: string | null
          quantity: number
          rating_count: number
          regular_price: number
          resolution: boolean | null
          slug: string
          specification: Json
          title: string
          version: string
          widget_ready: boolean | null
        }
        Insert: {
          brand: string
          category: string
          created_at?: string
          description: string
          discount: number
          discount_unit: string
          documentation?: boolean | null
          features: string
          id?: string
          image_1: string
          image_2?: string | null
          image_3?: string | null
          image_4?: string | null
          image_5?: string | null
          included: string
          keyword?: string | null
          layout?: boolean | null
          payment?: string
          preview_note?: string | null
          preview_url?: string | null
          quantity: number
          rating_count: number
          regular_price: number
          resolution?: boolean | null
          slug: string
          specification: Json
          title: string
          version: string
          widget_ready?: boolean | null
        }
        Update: {
          brand?: string
          category?: string
          created_at?: string
          description?: string
          discount?: number
          discount_unit?: string
          documentation?: boolean | null
          features?: string
          id?: string
          image_1?: string
          image_2?: string | null
          image_3?: string | null
          image_4?: string | null
          image_5?: string | null
          included?: string
          keyword?: string | null
          layout?: boolean | null
          payment?: string
          preview_note?: string | null
          preview_url?: string | null
          quantity?: number
          rating_count?: number
          regular_price?: number
          resolution?: boolean | null
          slug?: string
          specification?: Json
          title?: string
          version?: string
          widget_ready?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_product_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
